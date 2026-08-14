import { hydrateRoot } from 'react-dom/client'
import { Document } from './Document'

hydrateRoot(document, <Document initialPath={window.location.pathname} />)
