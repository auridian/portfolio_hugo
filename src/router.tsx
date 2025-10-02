import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './routes/RootLayout';
import { HomePage } from './routes/HomePage';
import { PostsPage } from './routes/PostsPage';
import { ResumePage } from './routes/ResumePage';
import { LinksPage } from './routes/LinksPage';
import { BlogPostPage, blogPostLoader } from './routes/BlogPostPage';
import { NotFoundPage } from './routes/NotFoundPage';
import { NowPage } from './routes/NowPage';
import { ProjectsPage } from './routes/ProjectsPage';
import { StatsPage } from './routes/StatsPage';
import { AboutPage } from './routes/AboutPage';
import { ContactPage } from './routes/ContactPage';
import { MetaPage } from './routes/MetaPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'posts',
        element: <PostsPage />
      },
      {
        path: 'now',
        element: <NowPage />
      },
      {
        path: 'projects',
        element: <ProjectsPage />
      },
      {
        path: 'stats',
        element: <StatsPage />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'contact',
        element: <ContactPage />
      },
      {
        path: 'meta',
        element: <MetaPage />
      },
      {
        path: 'resume',
        element: <ResumePage />
      },
      {
        path: 'links',
        element: <LinksPage />
      },
      {
        path: 'blog/:slug',
        loader: blogPostLoader,
        element: <BlogPostPage />,
        errorElement: <NotFoundPage />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]);
