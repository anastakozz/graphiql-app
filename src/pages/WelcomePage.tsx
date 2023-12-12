import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ABOUT_US, setAuthListener, userContext } from '../lib';
import { Button, TeamBlock } from '../components';
import { pageData } from '../lib/commonTypes/interfaces';

export default function WelcomePage() {
  const { localData } = useContext(userContext);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [data, setData] = useState<pageData | null>(null);
  const navigate = useNavigate();

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
                <Button onClick={() => navigate('/sign-in')} className="" variant="link">
                  {data.signIn}
                </Button>
                <Button onClick={() => navigate('/sign-up')} className="" variant="link">
                  {data.signUp}
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate('/main')} className="" variant="link">
                {data.toMain}
              </Button>
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
