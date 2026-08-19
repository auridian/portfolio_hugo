import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './routes/RootLayout';
import { HomePage } from './routes/HomePage';
import { PostsPage } from './routes/PostsPage';
import { ResumePage } from './routes/ResumePage';
import { LinksPage } from './routes/LinksPage';
import { FunPage } from './routes/FunPage';
import { BlogPostPage, blogPostLoader } from './routes/BlogPostPage';
import { NotFoundPage } from './routes/NotFoundPage';
import { ProjectsPage } from './routes/ProjectsPage';
import { AboutPage } from './routes/AboutPage';
import { ContactPage } from './routes/ContactPage';
import { MetaPage } from './routes/MetaPage';
import { ServicesPage } from './routes/ServicesPage';
import { DevNullPage } from './routes/DevNullPage';

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
        path: 'projects',
        element: <ProjectsPage />
      },
      {
        path: 'fun',
        element: <FunPage />
      },
      {
        path: 'services',
        element: <ServicesPage />
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
        path: 'dev/null',
        element: <DevNullPage />
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
