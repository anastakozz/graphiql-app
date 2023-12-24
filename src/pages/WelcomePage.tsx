import { useContext } from 'react';
import { ABOUT_US, userContext } from '../lib';
import { AutorizationLinks, TeamBlock } from '../components';

export default function WelcomePage() {
  const dictionary = useContext(userContext).localData?.welcomePage;

  return (
    <main>
      <div className="container900 welcome-section">
        <AutorizationLinks />
        {dictionary && (
          <>
            <h1 className="main-title text-center">{dictionary.title}</h1>

            <div className="our-team-section">
              <h2 className="secondary-title text-center">{dictionary.aboutUsTitle}</h2>
              {ABOUT_US.map((item, index) => (
                <TeamBlock key={index} data={dictionary} item={item} index={index} />
              ))}
            </div>
            <div className="information-section project-information-section">
              <h2 className="secondary-title text-center">{dictionary.aboutProjectTitle}</h2>
              <p>{dictionary.projectInfo}</p>
            </div>
            <div className="information-section course-information-section">
              <h2 className="secondary-title text-center">{dictionary.aboutCourseTitle}</h2>
              <p>{dictionary.courseInfo}</p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
