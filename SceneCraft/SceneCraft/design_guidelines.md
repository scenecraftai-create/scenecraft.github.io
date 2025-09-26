# Scenecraft Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from professional image editing platforms like Canva and Photoshop web interfaces, combined with modern SaaS landing page patterns. The design emphasizes functionality and trust while maintaining visual appeal for creative professionals.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Brand Green: 99 65% 35% (deep forest green)
- Brand Gold: 38 70% 45% (rich golden accent)

**Supporting Colors:**
- Background: 220 15% 8% (dark charcoal)
- Surface: 220 10% 12% (elevated surfaces)
- Text Primary: 0 0% 95% (near white)
- Text Secondary: 0 0% 70% (muted text)
- Success: 142 65% 45% (processing feedback)
- Error: 0 70% 55% (validation errors)

### Typography
- **Primary Font**: Inter (via Google Fonts CDN)
- **Headings**: 600-700 weight, larger sizes for impact
- **Body Text**: 400-500 weight, optimized for readability
- **UI Elements**: 500 weight for buttons and labels

### Layout System
**Spacing Primitives**: Tailwind units of 4, 8, 12, and 16 for consistent rhythm
- Micro spacing: p-4, m-4
- Component spacing: gap-8, p-8
- Section spacing: py-12, my-16
- Page margins: px-8, max-width constraints

### Component Library

**Before/After Containers:**
- Side-by-side layout on desktop, stacked on mobile
- Rounded corners (rounded-xl) with subtle borders
- Drop zones with dashed borders and upload icons
- Preview areas with 16:9 aspect ratio maintained
- Smooth transitions between states

**Form Elements:**
- Consistent padding (p-4) and rounded corners (rounded-lg)
- Focus states with brand green accent
- File upload with drag-and-drop visual feedback
- Validation messages in error color
- Submit button with loading states

**Navigation:**
- Clean header with logo and minimal navigation
- Sticky positioning for form access
- Mobile-responsive hamburger menu

### Visual Treatments

**Upload Areas:**
- Subtle gradient backgrounds: from 99 20% 20% to 99 15% 15%
- Dashed borders in brand colors when active
- Hover states with gentle scaling (scale-105)
- File type icons and clear instructions

**Processing States:**
- Animated loading indicators in brand green
- Progress feedback for file uploads
- Success confirmations with checkmark animations
- Clear error messaging with actionable instructions

### Images
**Hero Section**: 
- Large background image showcasing before/after photo editing examples
- Subtle overlay gradient from 220 15% 8% with 60% opacity
- Professional photography demonstrating AI editing capabilities

**Feature Demonstrations**:
- Small preview thumbnails in before/after containers
- Stock photography examples showing various editing scenarios
- Icon illustrations for upload states and processing feedback

### Interaction Design
- Minimal animations focused on feedback and state changes
- Smooth file upload with progress indicators
- Form validation with real-time feedback
- Mobile-optimized touch targets (min 44px)
- Keyboard navigation support throughout

### Responsive Approach
- Mobile-first design with progressive enhancement
- Container queries for optimal component sizing
- Flexible grid systems for before/after comparisons
- Touch-optimized file upload on mobile devices

This design balances professional credibility with creative appeal, ensuring users trust the AI editing service while enjoying an intuitive upload and preview experience.