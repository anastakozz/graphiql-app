import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ABOUT_US, setAuthListener, userContext } from '../lib';
import { Button, TeamBlock } from '../components';

export default function WelcomePage() {
  const dictionary = useContext(userContext).localData?.welcomePage;
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => setAuthListener({ setIsUserLoggedIn }), []);

  return (
    dictionary && (
      <main>
        <div className="container900 welcome-section">
          <div className="sign-links-container text-center">
            {!isUserLoggedIn ? (
              <>
                <Button onClick={() => navigate('/sign-in')} className="" variant="link">
                  {dictionary.signIn}
                </Button>
                <Button onClick={() => navigate('/sign-up')} className="" variant="link">
                  {dictionary.signUp}
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate('/main')} className="" variant="link">
                {dictionary.toMain}
              </Button>
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
