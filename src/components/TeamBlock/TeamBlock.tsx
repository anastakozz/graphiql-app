import GithubLogo from '../../assets/github-logo';
import { ITeamBlock } from '../../lib/commonTypes/interfaces';

export default function TeamBlock({ data, item, index }: ITeamBlock) {
  return (
    <div
      data-testid="team-block"
      className={`our-team-section-item ${index % 2 != 0 ? ' our-team-section__item_revert' : ''}`}
    >
      <div className="photo-container">
        <img className="team-mate-photo" src={item.img} alt="team-mate" />
        <a
          className="github-link"
          target="_blank"
          rel="noreferrer"
          data-testid="github-link"
          href={item.github}
        >
          <GithubLogo width="20px" />
        </a>
      </div>
      <div>
        <p className="team-mate-name">{data[item.nameKey]}</p>
        <p className="team-mate-role">{data[item.roleKey]}</p>
        <p className="team-mate-bio">&quot;{data[item.bioKey]}&quot;</p>
      </div>
    </div>
  );
}
