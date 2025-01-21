import Settings from "~/components/Layout/Settings/Settings";
import StyleGuide from "~/components/Layout/StylesGuide";
import BossTracker from "~/routes/BossTracker";



export const staticRoutes: Record<string, React.ElementType> = {
    "style" : StyleGuide,
    "settings" : Settings,
    "bossTracker" : BossTracker,
}