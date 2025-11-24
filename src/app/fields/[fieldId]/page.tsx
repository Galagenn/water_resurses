import { notFound } from "next/navigation";
import { Container } from "@mui/material";
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

  return (
    <Container maxWidth={false} sx={{ maxWidth: 1440, px: { xs: 1.25, sm: 2.5, md: 0 } }}>
      <FieldDetailView field={field} />
    </Container>
  );
};

export default FieldDetailPage;

