import Header from '@/feature/components/composites/Header';

const BusinessProfile = () => {
  return (
    <div>
      <Header
        pageName={'ბიზნეს დეშბორდი'}
        showSearch={true}
        showProfileButton={true}
        showNotificationButton={true}
        closeButton={false}
        categoryButton={false}
      />
    </div>
  );
};

export default BusinessProfile;
