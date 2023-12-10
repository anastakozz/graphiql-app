import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userContext from '../lib/context';
import { pageData } from '../lib/interface';
import { ABOUT_US } from '../lib/constants';
import { Button } from '../components';
import TeamBlock from '../components/TeamBlock/TeamBlock';

export default function WelcomePage() {
  const { isUserLoggedIn, localData } = useContext(userContext);
  const [data, setData] = useState<pageData | null>(null);

  const navigate = useNavigate();

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
