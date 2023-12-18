import React from 'react';
import { useRoutes } from 'react-router-dom';
import { AstrologerAddPage, AstrologerListPage } from './elements';
// import Dashboard from "../views/Dashboard";

export default function AppRouter() {
  return useRoutes([
    {
      path: '/astrologer-list',
      element: <AstrologerListPage children={undefined} />,
    },
    {
      path: '/',
      element: <AstrologerAddPage children={undefined} />,
    },
    {
      path: '/astrologer-edit/:id',
      element: <AstrologerAddPage children={undefined} />,
    },
  ]);
}
