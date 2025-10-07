import { NextRequest, NextResponse } from 'next/server';
import {connectDB} from '@/utils/mongodb';
import Article from '@/models/Article';

// GET - Récupérer un article
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const article = await Article.findById(params.id);

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

// PUT - Mettre à jour un article
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { title, category, excerpt, content, image, status } = body;

    const article = await Article.findByIdAndUpdate(
      params.id,
      { title, category, excerpt, content, image, status },
      { new: true }
    );

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

// DELETE - Supprimer un article
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const article = await Article.findByIdAndDelete(params.id);

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Article deleted' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}