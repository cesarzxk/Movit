import { useRouter } from "next/router";

export function ActiveLink({ children, href }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a data-testid="activeLink" href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
