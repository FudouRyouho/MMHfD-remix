import { useParams } from "@remix-run/react";
import { staticRoutes } from "~/lib/staticRoutes";


export default function StaticRoutes() {
    const { staticRoute } = useParams();
    console.log('route' ,staticRoute)

    if (!staticRoute) {
      return <div>Ruta no encontrada</div>;
  }
    const StaticRoute = staticRoutes[staticRoute]

    if (!StaticRoute) {
      return <div>Ruta no encontrada</div>
    }

    return <StaticRoute/>
  }