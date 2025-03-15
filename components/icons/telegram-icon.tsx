import * as React from "react";
import { useTheme } from "next-themes";

function TelegramIcon(props: React.SVGProps<SVGSVGElement> | undefined) {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Устанавливаем состояние после монтирования компонента
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Если компонент не смонтирован, показываем пустой элемент или другой индикатор
  if (!mounted) return null;

  const fillColor = theme === 'dark' ? '#fff' : '#000';

  return (
    <svg
      width="20px"
      height="20px"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon fill-foreground"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
    </svg>
  );
}

export default TelegramIcon;