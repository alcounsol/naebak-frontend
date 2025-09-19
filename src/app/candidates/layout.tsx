import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'المرشحون والنواب - نائبك.كوم',
  description: 'تعرف على المرشحين والنواب في محافظتك، اطلع على برامجهم الانتخابية وتواصل معهم مباشرة',
  keywords: 'مرشحين، نواب، انتخابات، مصر، برلمان، تواصل',
};

export default function CandidatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
