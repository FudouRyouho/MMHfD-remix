import type React from "react"
import "reactflow/dist/style.css"
import ElementalPentagram from "../components/Layout/Pages/ElementalPentagram"
import { Dark, Earth, Fire, Water } from "~/components/icons/IconBase"

export const elementsList = [
  {
    name: "Fire",
    color: "#F87171",
    accentColor: "#EF4444",
    icon: Fire,
    relationships: [
      { target: "Dark", damage: 120 },
      { target: "Wind", damage: 110 },
      { target: "Earth", damage: 90 },
      { target: "Water", damage: 80 },
    ],
  },
  {
    name: "Water",
    color: "#60A5FA",
    accentColor: "#3B82F6",
    icon: Water,
    relationships: [
      { target: "Fire", damage: 120 },
      { target: "Dark", damage: 110 },
      { target: "Wind", damage: 90 },
      { target: "Earth", damage: 80 },
    ],
  },
  {
    name: "Earth",
    color: "#FBBF24",
    accentColor: "#F59E0B",
    icon: Earth,
    relationships: [
      { target: "Water", damage: 120 },
      { target: "Fire", damage: 110 },
      { target: "Dark", damage: 90 },
      { target: "Wind", damage: 80 },
    ],
  },
  {
    name: "Wind",
    color: "#67E8F9",
    accentColor: "#22D3EE",
    icon: Water,
    relationships: [
      { target: "Earth", damage: 120 },
      { target: "Water", damage: 110 },
      { target: "Dark", damage: 80 },
      { target: "Fire", damage: 90 },
    ],
  },
  {
    name: "Dark",
    color: "#C084FC",
    accentColor: "#A855F7",
    icon:Dark,
    relationships: [
      { target: "Wind", damage: 120 },
      { target: "Earth", damage: 110 },
      { target: "Water", damage: 90 },
      { target: "Fire", damage: 80 },
    ],
  },
]

const PentagramGuides: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <ElementalPentagram elements={elementsList} />
    </div>
  )
}

export default PentagramGuides

