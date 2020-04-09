import React from 'react'
import cx from 'classnames';
import githubImage from '../images/icon-github.png';

const Outro = ({ className, onWheel }) => (
  <div className={cx('outro', className)} onWheel={onWheel}>
    <div className="legend">
      <div>
        <div>
          <div className="legend-item">
            <span className="legend-square animalia"></span>
            Kingdom name: Animalia
          </div>
          <div className="legend-item">
            <span className="legend-square plantae"></span>
            Kingdom name: Plantae
          </div>
        </div>
        <div>
          <div className="legend-item">
            <span className="legend-square round"></span>
            Probably extinct
          </div>
          <div className="legend-item">
            <span className="legend-square"></span>
            Extinct
          </div>
        </div>
      </div>
    </div>
    <div className="methodology">
      This is a sample of the extint and probably extint species included in the
      IUCN redlist. Only species with an exact date of registration were
      included
    </div>
    <div>
      <p>
        The rate of species extinction is already at least tens to hundreds of
        times higher than it has averaged over the past 10 million years, and it
        is set to rise sharply still further unless drivers are reduced
      </p>
      <p>
        Around a million animal and plant species are currently threatened, and
        a third of the total species extinction risk to date has arisen in the
        last 25 years
      </p>
      <p>
        Land/sea use change is the most common direct driver threatening
        assessed species, followed by (in descending order of prevalence) direct
        exploitation, pollution, invasive alien species and climate change
      </p>
      <button id="scroll-button">↓</button>
    </div>
    <div className="sources">
      Sources:
      <ul className="source-list">
        <li>
          <a
            className="source"
            href="https://ipbes.net/sites/default/files/ipbes_global_assessment_chapter_2_2_nature_unedited_31may.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            IPBES Global Assesment
          </a>
        </li>
        <li>
          <a
            className="source"
            href="https://www.iucnredlist.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            IUCN redlist
          </a>
        </li>
      </ul>
    </div>
    <div className="credit">
      <a
        href="https://github.com/bluesmile82"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img id="credit-image" alt="github" src={githubImage} />
        Alvaro Leal 2020
      </a>
    </div>
  </div>
);

export default Outro;
