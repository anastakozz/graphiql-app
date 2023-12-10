import GithubLogo from '../../assets/github-logo';

export default function Footer() {
  return (
    <footer className="footer">
      <a
        className="footer-cta"
        href="https://github.com/anastakozz/graphiql-app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubLogo width="30px" />
      </a>
      <p className="copyright">&copy; useBrain 2023</p>
      <a
        className="footer-cta"
        href="https://rs.school/react/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img width={'80px'} src="https://rs.school/images/rs_school_js.svg" alt="rs-scool-logo" />
      </a>
    </footer>
  );
}
