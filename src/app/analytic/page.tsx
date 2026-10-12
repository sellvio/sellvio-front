import { Suspense } from "react";
import Analitic from "../../../feature/analytic/components/composites/Analitic";
import RequireUserType from "../../../feature/components/RequireUserType";

const page = () => {
  return (
    <RequireUserType userType="business">
      <div>
        <Suspense fallback={null}>
          <Analitic />
        </Suspense>
      </div>
    </RequireUserType>
  );
};

export default page;
