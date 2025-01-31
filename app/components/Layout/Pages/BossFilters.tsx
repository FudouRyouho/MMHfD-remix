import { useCallback } from "react";
import UIButtons from "../UI/UI-Button";
import UIComboBox from "../UI/UI-Combobox";

interface BossFiltersProps {
    selectedBoss: string | null;
    bosses: string[];
    onFilterChange: (boss: string | null) => void;
  }
  
  export default function BossFilters({ selectedBoss, bosses, onFilterChange }: BossFiltersProps) {
    
    const showAllData = useCallback(() => onFilterChange(null), []);
    return (
      <div className="flex flex-row gap-2 my-4">
        <UIButtons
          text="All"
          variant="primary"
          onClick={showAllData}
          disabled={selectedBoss === null}
        />
        <UIComboBox
          label={selectedBoss || "Select Boss"}
          options={bosses}
          value={selectedBoss || ""}
          onChange={onFilterChange}
        />
      </div>
    );
  }
  