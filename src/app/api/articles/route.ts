import { NextRequest, NextResponse } from 'next/server';
import Article from '@/models/Article';
import slugify from 'slugify';
import connectDB from '@/utils/mongodb';

// GET - Récupérer tous les articles
// GET - Récupérer tous les articles
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const query = status ? { status } : {}; 
    const articles = await Article.find(query).sort({ createdAt: -1 });

    return NextResponse.json(articles);
  } catch (error) {
    console.error('❌ Erreur GET API /api/articles :', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}


// POST - Créer un nouvel article
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { title, category, excerpt, content, image, status } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    // 🔹 Génération du slug (unique et propre)
    let slug = slugify(title, { lower: true, strict: true });

    // 🔹 Si le slug existe déjà, on ajoute un timestamp pour le rendre unique
    const existing = await Article.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const article = await Article.create({
      title,
      slug, // ✅ on enregistre bien le slug ici
      category: category || 'Tech',
      excerpt: excerpt || '',
      content,
      image: image || '/images/default.jpg',
      status: status || 'draft',
      date: new Date().toLocaleDateString('fr-FR'),
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
