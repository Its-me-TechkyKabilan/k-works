import PageTitle from '../components/PageTitle.jsx'
import UploadForm from '../components/UploadForm.jsx'

export default function UploadWork() {
  return (
    <main className="min-h-screen bg-[#030303] text-[#f8f1df]">
      <PageTitle
        eyebrow="Upload Work"
        title="Add a new capture."
        description="Drop in an image, give it context, and save it into the demo archive."
      />

      <section className="page-shell pb-24">
        <UploadForm />
      </section>
    </main>
  )
}
