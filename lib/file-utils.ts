import { saveAs } from "file-saver"
import { Document, Packer, Paragraph, TextRun } from "docx"
import { jsPDF } from "jspdf"

// Download as plain text
export function downloadAsText(text: string, filename = "extracted-text") {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" })
  saveAs(blob, `${filename}.txt`)
}

// Download as Word document
export async function downloadAsDoc(text: string, filename = "extracted-text") {
  // Create document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: text.split("\n").map(
          (paragraph) =>
            new Paragraph({
              children: [new TextRun(paragraph)],
            }),
        ),
      },
    ],
  })

  // Generate and save document
  const buffer = await Packer.toBuffer(doc)
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" })
  saveAs(blob, `${filename}.docx`)
}

// Download as PDF
export function downloadAsPdf(text: string, filename = "extracted-text") {
  const pdf = new jsPDF()

  // Split text into lines to handle wrapping
  const textLines = pdf.splitTextToSize(text, 180)

  // Add text to PDF
  pdf.text(textLines, 15, 15)

  // Save PDF
  pdf.save(`${filename}.pdf`)
}
