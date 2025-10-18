import { RoleBasedRoute } from "../auth/RoleBasedRoute";
import { SimplifiedDealPipeline } from "./simplified-deal-pipeline";


export default function DealsPage() {
  return (
    <RoleBasedRoute allowedRoles={['admin']}>
      <SimplifiedDealPipeline />;
    </RoleBasedRoute>


  )


}