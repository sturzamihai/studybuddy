export default function Footer() {
  return (
    <footer>
      <div className="container mx-auto text-gray-400 font-light text-sm">
        <hr  className="mt-5 mb-2"/>
        © {new Date().getFullYear()} MGS, RIS, RIS - 1096E. All rights reserved.
      </div>
    </footer>
  );
}
