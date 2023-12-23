import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ABOUT_US, setAuthListener, userContext } from '../lib';
import { TeamBlock } from '../components';

export default function WelcomePage() {
  const dictionary = useContext(userContext).localData?.welcomePage;
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => setAuthListener({ setIsUserLoggedIn }), []);

  return (
    dictionary && (
      <main>
        <div className="container900 welcome-section">
          <div className="sign-links-container text-center">
            {isUserLoggedIn ? (
              <Link className="link-button link-button__empty " to="/main">
                <p>{dictionary.toMain}</p>
              </Link>
            ) : (
              <>
                <Link className="link-button link-button__empty " to="/sign-in">
                  <p>{dictionary.signIn}</p>
                </Link>

                <Link className="link-button link-button__empty" to="/sign-up">
                  <p>{dictionary.signUp}</p>
                </Link>
              </>
            )}
          </div>

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
        </div>
      </main>
    )
  );
}
