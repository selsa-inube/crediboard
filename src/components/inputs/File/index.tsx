import { FileUI } from "./interface";

interface FileProps {
  name: string;
  size: string;
  onDelete?: () => void;
  withBorder?: boolean;
}

function File(props: FileProps) {
  const { withBorder = true, name, size, onDelete } = props;
  return (
    <FileUI
      withBorder={withBorder}
      name={name}
      size={size}
      onDelete={onDelete}
    />
  );
}

export { File };
