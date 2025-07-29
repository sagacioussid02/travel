import {NextRequest, NextResponse} from 'next/server';
import pdf from 'pdf-parse/lib/pdf-parse.js';
import *s as fs from 'fs/promises';
import *s as path from 'path';

// Helper function to safely update the prompt file
async function updateItineraryPrompt(newContent: string) {
    const filePath = path.join(process.cwd(), 'src', 'ai', 'flows', 'generate-travel-itinerary.ts');
    
    try {
        const originalContent = await fs.readFile(filePath, 'utf-8');

        // This is a simple but fragile way to inject content.
        // In a real-world app, you'd use a more robust template engine or AST manipulation.
        const marker = '---';
        const insertionPoint = originalContent.lastIndexOf(marker);

        if (insertionPoint === -1) {
            throw new Error('Could not find the insertion point in the prompt file.');
        }

        const customDataBlock = `
  CUSTOM TRAVEL BLOG DATA:
  ${newContent}
`;

        const newFileContent = originalContent.substring(0, insertionPoint) + marker + customDataBlock + '\n`,\n});';
        
        // This is a simplified search and replace for the final part of the file.
        // A more robust solution is needed for production.
        const finalContent = originalContent.replace(
            /(---\n)(.|\n)*?(`,\n}\);)/, 
            `$1\n${customDataBlock}\n$3`
        );


        // A simple text injection - might not be robust
        const promptStart = "prompt: `";
        const promptEnd = "`,";
        const startIdx = originalContent.indexOf(promptStart);
        const endIdx = originalContent.lastIndexOf(promptEnd, originalContent.lastIndexOf("const generateTravelItineraryFlow"));

        if (startIdx === -1 || endIdx === -1) {
             throw new Error('Could not find prompt in file.');
        }
        
        // Let's use a more specific marker for our custom data
        const customDataStartMarker = '--- CUSTOM TRAVEL BLOG DATA:';
        const customDataEndMarker = '---';
        
        let existingCustomData = '';
        const customDataStartIdx = originalContent.indexOf(customDataStartMarker);

        const promptTemplate = originalContent.substring(startIdx + promptStart.length, endIdx);
        let basePrompt = promptTemplate;

        if (customDataStartIdx > -1) {
             const customDataEndIdx = promptTemplate.lastIndexOf(customDataEndMarker);
             existingCustomData = promptTemplate.substring(customDataStartIdx + customDataStartMarker.length, customDataEndIdx);
             basePrompt = promptTemplate.substring(0, customDataStartIdx);
        } else {
             const factsEndIdx = promptTemplate.lastIndexOf(customDataEndMarker);
             basePrompt = promptTemplate.substring(0, factsEndIdx);
        }
        
        const updatedCustomData = `${existingCustomData}\n\n${newContent}`;
        
        const finalPrompt = `${basePrompt}${customDataStartMarker}\n${updatedCustomData}\n${customDataEndMarker}\n`;

        const newFileContent = originalContent.substring(0, startIdx + promptStart.length) + finalPrompt + originalContent.substring(endIdx);

        await fs.writeFile(filePath, newFileContent, 'utf-8');

    } catch (error) {
        console.error('Failed to update prompt file:', error);
        // In a real app, handle this more gracefully.
        throw new Error('Could not write to the AI prompt file.');
    }
}


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({error: 'No file provided.'}, {status: 400});
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        {error: 'Invalid file type. Please upload a PDF.'},
        {status: 400}
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const pdfData = await pdf(buffer);

    // Instead of just logging, we will now update the prompt file.
    await updateItineraryPrompt(`
    Source: ${file.name}
    Content: ${pdfData.text}
    `);


    return NextResponse.json(
      {
        success: true,
        message: `Successfully ingested ${file.name} and updated AI knowledge base.`,
        pages: pdfData.numpages,
        textLength: pdfData.text.length,
      },
      {status: 200}
    );
  } catch (error) {
    console.error('Ingestion error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      {error: 'Failed to process the PDF file.', details: errorMessage},
      {status: 500}
    );
  }
}
