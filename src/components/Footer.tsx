const authors = [
  "Stoica Răzvan Iulian",
  "Mihai-George Sturza",
  "Ștefan Roberto-Ionuț",
];

export default function Footer() {
  return (
    <footer className="flex justify-center flex-col items-center gap-4 font-mono">
      <p className=" tracking-widest text-gray-500">STUDYBUDDY</p>
      <div className="flex items-center divide-x">
        {authors.map((author, idx) => (
          <p key={idx} className="text-gray-400 text-xs uppercase px-2">
            {author}
          </p>
        ))}
      </div>
    </footer>
  );
}
