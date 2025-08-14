import { FileImage } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";

export default function DocumentViewer({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FileImage className="h-4 w-4 mr-1" />
          Ver
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <Image
            src={url}
            alt={title}
            width={100}
            height={100}
            className="max-w-full max-h-[60vh] object-contain rounded-md"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
