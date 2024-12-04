import { NextResponse } from 'next/server';
import Replicate from 'replicate';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
  }

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  try {
    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      { input: { prompt } }
    );

    console.log('Replicate API output:', JSON.stringify(output, null, 2));

    let imageUrl;
    if (Array.isArray(output) && output.length > 0) {
      imageUrl = output[0];
    } else if (typeof output === 'string') {
      imageUrl = output;
    } else if (typeof output === 'object' && output !== null) {
      // Assert output as a record with string keys and any values
      const outputRecord = output as Record<string, any>;

      // Check for common properties that might contain the image URL
      imageUrl = outputRecord.image || outputRecord.url || outputRecord.output || outputRecord.generated_image;

      // If still not found, search for any string property that looks like a URL
      if (!imageUrl) {
        for (const key in outputRecord) {
          if (typeof outputRecord[key] === 'string' && outputRecord[key].startsWith('http')) {
            imageUrl = outputRecord[key];
            break;
          }
        }
      }
    }

    if (imageUrl && typeof imageUrl === 'string') {
      return NextResponse.json({ imageUrl });
    } else {
      console.error('Unexpected output format:', output);
      throw new Error('No valid image URL found in the response');
    }
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}