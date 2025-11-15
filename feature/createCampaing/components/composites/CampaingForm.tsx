import CompanyBasics from '../primitives/CompanyBasics';
import CompanyDetails from '../primitives/CompanyDetails';
import ExtraMedia from '../primitives/ExtraMedia';
import GoalCreatores from '../primitives/GoalCreatores';
import PaymentStructure from '../primitives/PaymentStructure';
import Platforms from '../primitives/Platforms';

const Form = () => {
  return (
    <div className="flex flex-col gap-16">
      <CompanyBasics />
      <Platforms />
      <PaymentStructure />
      <GoalCreatores />
      <ExtraMedia />
      <CompanyDetails />
    </div>
  );
};

export default Form;
