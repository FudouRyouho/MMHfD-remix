import Settings from "~/components/Layout/Settings/Settings";
import StyleGuide from "~/components/Layout/StylesGuide";
import BossTracker from "~/routes/Helpers.BossTracker";



export const staticRoutes: Record<string, React.ElementType> = {
    "Settings" : Settings,
    "style" : StyleGuide,

}