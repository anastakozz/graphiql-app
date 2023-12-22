import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ABOUT_US, setAuthListener, userContext } from '../lib';
import { TeamBlock } from '../components';
import { pageData } from '../lib/commonTypes/interfaces';

export default function WelcomePage() {
  const { localData } = useContext(userContext);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [data, setData] = useState<pageData | null>(null);

  useEffect(() => setAuthListener({ setIsUserLoggedIn }), []);
  useEffect(() => {
    if (localData) {
      const data = localData['welcomePage'];
      setData(data);
    }
  }, [localData]);

  return (
    data && (
      <main>
        <div className="container900 welcome-section">
          <div className="sign-links-container text-center">
            {!isUserLoggedIn ? (
              <>
                <Link className="link-button link-button__empty " to="/sign-in">
                  <p>{data.signIn}</p>
                </Link>

                <Link className="link-button link-button__empty" to="/sign-up">
                  <p>{data.signUp}</p>
                </Link>
              </>
            ) : (
              <Link className="link-button link-button__empty " to="/main">
                <p>{data.toMain}</p>
              </Link>
            )}
          </div>

          <h1 className="main-title text-center">{data.title}</h1>

          <div className="our-team-section">
            <h2 className="secondary-title text-center">{data.aboutUsTitle}</h2>
            {ABOUT_US.map((item, index) => (
              <TeamBlock key={index} data={data} item={item} index={index} />
            ))}
          </div>
          <div className="information-section project-information-section">
            <h2 className="secondary-title text-center">{data.aboutProjectTitle}</h2>
            <p>{data.projectInfo}</p>
          </div>
          <div className="information-section course-information-section">
            <h2 className="secondary-title text-center">{data.aboutCourseTitle}</h2>
            <p>{data.courseInfo}</p>
          </div>
        </div>
      </main>
    )
  );
}
