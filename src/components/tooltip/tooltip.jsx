import React, { useMemo } from 'react'
import { isMobileOrTablet } from '../../utils';
import './tooltip.scss'

const Tooltip = ({ data }) => {
  const mobileOrTablet = useMemo(() => isMobileOrTablet(), []);
  return (
    <div className="tooltip">
      <div className="tooltip-name">{data.name}</div>
      <div className="kingdom-name">
        {data.kingdomName} - {data.speciesClassName}
      </div>
      {mobileOrTablet ? (
        ''
      ) : (
        <div className="tooltip-message">
          Click to open wikipedia page
        </div>
      )}
    </div>
  );
}

export default Tooltip;
