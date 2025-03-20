"use client"

import type React from "react"
import { useState } from "react"
import { Switch } from "@headlessui/react"

const RADIUS = 150
const CENTER = 250

interface Relationship {
  target: string
  damage: number
}

interface Element {
  name: string
  color: string
  accentColor: string
  icon: React.ElementType
  relationships: Relationship[]
}

interface ElementalPentagramProps {
  elements: Element[]
}

const ElementalPentagram: React.FC<ElementalPentagramProps> = ({ elements }) => {
  const [selectedElementName, setSelectedElementName] = useState<string | null>(null)
  const [showDamageDealt, setShowDamageDealt] = useState(false)

  const handleElementSelected = (element: Element) => {
    setSelectedElementName(element.name === selectedElementName ? null : element.name)
  }

  const getPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2
    return {
      x: CENTER + RADIUS * Math.cos(angle),
      y: CENTER + RADIUS * Math.sin(angle),
    }
  }

  const getLineEndpoint = (start: { x: number; y: number }, end: { x: number; y: number }, distance: number) => {
    const dx = end.x - start.x
    const dy = end.y - start.y
    const length = Math.sqrt(dx * dx + dy * dy)
    const ratio = (length - distance) / length
    return {
      x: start.x + dx * ratio,
      y: start.y + dy * ratio,
    }
  }

  const renderDefaultArrows = () => {
    return elements.map((element, index) => {
      const strongRelationship = element.relationships.find((rel) => rel.damage === 120)
      if (!strongRelationship) return null

      const targetIndex = elements.findIndex((e) => e.name === strongRelationship.target)
      const startPos = getPosition(index, elements.length)
      const endPos = getPosition(targetIndex, elements.length)
      const lineStart = getLineEndpoint(startPos, endPos, 50)
      const lineEnd = getLineEndpoint(endPos, startPos, 50)

      return (
        <g key={`default-${element.name}-${strongRelationship.target}`}>
          <line
            x1={lineStart.x}
            y1={lineStart.y}
            x2={lineEnd.x}
            y2={lineEnd.y}
            stroke="#10B981"
            strokeWidth="2"
            markerEnd="url(#arrowheadStrong)"
          />
        </g>
      )
    })
  }

const renderArrows = (selectedElement: Element) => {
  if (showDamageDealt) {
    return selectedElement.relationships.map((rel) => {
      const startPos = getPosition(elements.indexOf(selectedElement), elements.length);
      const endPos = getPosition(
        elements.findIndex((e) => e.name === rel.target),
        elements.length
      );
      const lineStart = getLineEndpoint(startPos, endPos, 50);
      const lineEnd = getLineEndpoint(endPos, startPos, 50);

      return (
        <g key={`${selectedElement.name}-${rel.target}`}>
          <line
            x1={lineStart.x}
            y1={lineStart.y}
            x2={lineEnd.x}
            y2={lineEnd.y}
            stroke={rel.damage > 100 ? "#10B981" : "#EF4444"}
            strokeWidth="2"
            markerEnd={`url(#${rel.damage > 100 ? "arrowheadStrong" : "arrowheadWeak"})`}
          />
          <text
            x={(lineStart.x + lineEnd.x) / 2}
            y={(lineStart.y + lineEnd.y) / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fill="white"
            fontSize="16"
            fontWeight="bold"
          >
            {`${rel.damage}%`}
          </text>
        </g>
      );
    });
  } else {  // Corrected Logic Here!!!
    return elements.map((targetElement) => { // Iterate through ALL elements as potential sources
      const relationship = targetElement.relationships.find(rel => rel.target === selectedElement.name);
      console.log(relationship)
      if (!relationship) return null; // Skip if no relationship exists FROM this source TO the selected element

      const startPos = getPosition(elements.indexOf(targetElement), elements.length);
      const endPos = getPosition(elements.indexOf(selectedElement), elements.length);
      const lineStart = getLineEndpoint(startPos, endPos, 50);
      const lineEnd = getLineEndpoint(endPos, startPos, 50);

      return (
        <g key={`${targetElement.name}-${selectedElement.name}`}>
          <line
            x1={lineStart.x}
            y1={lineStart.y}
            x2={lineEnd.x}
            y2={lineEnd.y}
            stroke={relationship.damage > 100 ? "#10B981" : "#EF4444"}
            strokeWidth="2"
            markerEnd={`url(#${relationship.damage > 100 ? "arrowheadStrong" : "arrowheadWeak"})`}
          />
          <text
            x={(lineStart.x + lineEnd.x) / 2}
            y={(lineStart.y + lineEnd.y) / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fill="white"
            fontSize="16"
            fontWeight="bold"
          >
            {`${relationship.damage}%`}
            
          </text>
         
        </g>
      );
    });
  }
};

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center space-x-2">
        <Switch
          checked={showDamageDealt}
          onChange={setShowDamageDealt}
          className={`${
            showDamageDealt ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Toggle damage view</span>
          <span
            className={`${
              showDamageDealt ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
        <label htmlFor="damage-mode" className="text-sm text-gray-700">
          {showDamageDealt ? "Mostrando daño causado" : "Mostrando daño recibido"}
        </label>
      </div>

      <svg width="500" height="500" viewBox="0 0 500 500">
        <rect width="100%" height="100%" fill="#1F2937" />

        {/* Render elements */}
        {elements.map((element, index) => {
          const pos = getPosition(index, elements.length)
          const iconSize = 65; // Tamaño del icono (ajusta según necesites)
          const iconX = pos.x - iconSize / 2; // Centrar horizontalmente
          const iconY = pos.y - iconSize / 2; // Centrar verticalmente
          return (
            <g key={element.name} onClick={() => handleElementSelected(element)} className="cursor-pointer">
              <circle
                cx={pos.x}
                cy={pos.y}
                r="45"
                fill={selectedElementName === element.name ? element.accentColor : element.color}
              />
              <element.icon width={iconSize} height={iconSize} x={iconX} y={iconY} />
              
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#1F2937"
                fontSize="16"
                fontWeight="bold"
              >
                {element.name}
              </text>
            </g>
          )
        })}

        {/* Render arrows */}
        {selectedElementName
          ? renderArrows(elements.find((e) => e.name === selectedElementName)!)
          : renderDefaultArrows()}

        {/* Define arrow markers */}
        <defs>
          <marker id="arrowheadStrong" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
          </marker>
          <marker id="arrowheadWeak" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}

export default ElementalPentagram

