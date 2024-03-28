const Footer = () => {
  return (
    <footer className="p-1 text-neutral-800 bg-orange-500">
      <h2 className="text-center font-bold">
        Desenvolvido por &copy; Josué Carvalho - {new Date().getFullYear()}
      </h2>
    </footer>
  );
};

export { Footer };
