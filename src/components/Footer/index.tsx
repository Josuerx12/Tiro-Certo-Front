const Footer = () => {
  return (
    <footer className="p-1 text-slate-50 bg-violet-950">
      <h2 className="text-center">
        Desenvolvido por &copy; Josué Carvalho - {new Date().getFullYear()}
      </h2>
    </footer>
  );
};

export { Footer };
