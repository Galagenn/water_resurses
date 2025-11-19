import { notFound } from "next/navigation";
import FieldDetailView from "@/components/fields/FieldDetailView";
import { fieldsSnapshot } from "@/data/dashboard";

type Props = {
  params: Promise<{ fieldId: string }>;
};

const FieldDetailPage = async ({ params }: Props) => {
  const { fieldId } = await params;
  const field = fieldsSnapshot.find((item) => item.id === fieldId);

  if (!field) {
    notFound();
  }

  return <FieldDetailView field={field} />;
};

export default FieldDetailPage;

