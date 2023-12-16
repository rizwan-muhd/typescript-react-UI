import React, { Suspense, lazy, ReactElement, ReactNode } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";

interface LoadableProps {
  children: ReactNode;
}

interface LoadingScreenProps {}

const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  // Implement LoadingScreen component logic here
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <LinearProgress />
    </Box>
  ); // Example implementation
};

const Loadable =
  <P extends object>(
    Component: React.ComponentType<P>
  ): React.FC<P & LoadableProps> =>
  (props: P & LoadableProps): ReactElement =>
    (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    );

export const AstrologerListPage = Loadable(
  lazy(() => import("../views/Astrologer/AstrologerListPage"))
);
export const AstrologerAddPage = Loadable(
  lazy(() => import("../views/Astrologer/Astrologer"))
);
