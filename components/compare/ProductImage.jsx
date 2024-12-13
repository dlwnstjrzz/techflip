import Image from "next/image";

export default function ProductImage({ image, name }) {
  return (
    <div className="aspect-square bg-white rounded-lg border overflow-hidden">
      {image ? (
        <div className="w-full h-full bg-gray-50">
          <Image
            src={image}
            alt={name}
            width={470}
            height={470}
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}
    </div>
  );
}
