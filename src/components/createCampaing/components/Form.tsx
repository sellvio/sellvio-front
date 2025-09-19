import CompanyBasics from "./CompanyBasics";
import CompanyDetails from "./CompanyDetails";
import ExtraMedia from "./ExtraMedia";
import GoalCreatores from "./GoalCreatores";
import PaymentStructure from "./PaymentStructure";
import Platforms from "./Platforms";

const Form = () => {
  return (
    <div className="flex gap-16 flex-col">
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
