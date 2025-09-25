import { Calendar22 } from "../../../components/ui/date-picker";
import CompanyBasics from "../primitives/CompanyBasics";
import CompanyDetails from "../primitives/CompanyDetails";
import ExtraMedia from "../primitives/ExtraMedia";
import GoalCreatores from "../primitives/GoalCreatores";
import PaymentStructure from "../primitives/PaymentStructure";
import Platforms from "../primitives/Platforms";

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
