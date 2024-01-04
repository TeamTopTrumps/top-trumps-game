interface cardProps {
  name: string;
  image: string;
  description: string;
  statList: stats[];
}

export const Card: React.FC<cardProps> = (
  name,
  image,
  description,
  statList
) => {
  return (
    <>
      <div>
        {name}
        {image}
        {description}
      </div>
    </>
  );
};
