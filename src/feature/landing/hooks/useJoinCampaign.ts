'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { participateInCampaign } from '@/lib/api/BusinessCards';
import { JoinableCampaign } from '../type';

const JOIN_ERROR_MESSAGES: Record<string, string> = {
  'Your participation request is already pending approval':
    'თქვენი მოთხოვნა უკვე განხილვის პროცესშია',
  'You are already participating in this campaign':
    'თქვენ უკვე ხართ ამ კამპანიის წევრი',
  'Your participation request was previously rejected':
    'თქვენი მოთხოვნა ამ კამპანიაზე უარყოფილია',
  'Campaign is not accepting participants':
    'კამპანია ამ ეტაპზე არ იღებს მონაწილეებს',
  'Only creators can participate in campaigns':
    'კამპანიაში გაწევრიანება მხოლოდ შემქმნელს შეუძლია',
  'Forbidden resource': 'კამპანიაში გაწევრიანება მხოლოდ შემქმნელს შეუძლია',
  'Campaign not found': 'კამპანია ვერ მოიძებნა',
};

const getStoredUserType = (): string | undefined => {
  try {
    return JSON.parse(localStorage.getItem('user') ?? 'null')?.user_type;
  } catch {
    return undefined;
  }
};

export const useJoinCampaign = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [pendingCampaign, setPendingCampaign] =
    useState<JoinableCampaign | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (campaign: JoinableCampaign) =>
      participateInCampaign(campaign.id),
    onSuccess: (_data, campaign) => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      queryClient.invalidateQueries({ queryKey: ['campaign', campaign.id] });
      setPendingCampaign(null);

      if (campaign.chat_type === 'private') {
        toast.success(
          'მოთხოვნა გაიგზავნა, დაელოდეთ ბიზნესის მიერ დადასტურებას'
        );
        return;
      }

      toast.success('წარმატებით გაწევრიანდით კამპანიაში');
      router.push(`/chat?campaignId=${campaign.id}`);
    },
    onError: (error: Error) => {
      setPendingCampaign(null);
      toast.error(
        JOIN_ERROR_MESSAGES[error.message] ??
          'კამპანიაში გაწევრიანება ვერ მოხერხდა'
      );
    },
  });

  const requestJoin = (campaign: JoinableCampaign) => {
    if (!localStorage.getItem('access_token')) {
      toast.info('კამპანიაში გაწევრიანებისთვის გაიარეთ ავტორიზაცია');
      router.push('/login');
      return;
    }

    if (getStoredUserType() === 'business') {
      toast.error('კამპანიაში გაწევრიანება მხოლოდ შემქმნელს შეუძლია');
      return;
    }

    setPendingCampaign(campaign);
  };

  const confirmJoin = () => {
    if (pendingCampaign) mutate(pendingCampaign);
  };

  const cancelJoin = () => {
    if (!isPending) setPendingCampaign(null);
  };

  return {
    pendingCampaign,
    requestJoin,
    confirmJoin,
    cancelJoin,
    isJoining: isPending,
  };
};
