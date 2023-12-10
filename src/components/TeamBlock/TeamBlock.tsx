import GithubLogo from '../../assets/github-logo';
import { AboutUsType } from '../../lib/constants';
import { pageData } from '../../lib/interfaces';

export default function TeamBlock({
  data,
  item,
  index,
}: {
  data: pageData;
  item: AboutUsType;
  index: number;
}) {
  return (
    <div
      className={`our-team-section__item ${index % 2 != 0 ? ' our-team-section__item_revert' : ''}`}
    >
      <div className="photo-container">
        <img className="team-mate-photo" src={item.img} alt="" />
        <a className="github-link" target="_blank" rel="noreferrer" href={item.github}>
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
