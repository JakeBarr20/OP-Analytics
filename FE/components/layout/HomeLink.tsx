import Link from "next/link";
import Image from "next/image";

interface HomeLinkProps {
  image: string;
  title: string;
  text: string;
  h: number;
  w: number;
}

const HomeLink: React.FC<HomeLinkProps> = ({ image, title, text, h, w }) => {
  return (
    <Link href={`/${title.toLowerCase()}`}>
      <div className="home-link">
        <Image priority src={image} alt="link image" height={h} width={w} />
        <h1 className="ubuntu-medium">{title}</h1>
        <p className="ubuntu-light">{text}</p>
      </div>
    </Link>
  );
};

export default HomeLink;
