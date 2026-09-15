# design-taste-frontend (taste-skill)

Skill חיצוני שמוטמע בפרויקט כדי למנוע עיצוב גנרי ("AI slop") בדפי נחיתה, עמודי תדמית ורידיזיינים.

- **מקור:** [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) — הסקיל `taste-skill` (v2), שם התקנה `design-taste-frontend`
- **גרסה שהועתקה:** commit `ccbc156`
- **רישיון:** MIT (ראו `LICENSE` בתיקייה זו)

## שימוש

הסקיל נטען אוטומטית על ידי Claude Code מתוך `.claude/skills/`. אפשר גם להפעיל אותו מפורשות עם `/design-taste-frontend`.

## מגבלות הפרויקט שגוברות על הסקיל

הסקיל הוא ברירת מחדל עיצובית, לא מקור האמת של הפרויקט. לפני שמאמצים המלצה ממנו:

- **טוקנים:** להשתמש במשתני ה-CSS הקיימים ב-`app/globals.css` (`--forest`, `--clay`, `--wheat`, `--offwhite`) ולא להמציא פלטה חדשה.
- **טיפוגרפיה:** Heebo היא גופן המערכת של האתר (`@fontsource/heebo`); לא להחליף אותה בגופן שהסקיל מציע.
- **RTL:** האתר בעברית. כל לייאאוט, אנימציה או רכיב חייבים לעבוד ב-`dir="rtl"`.
- **סטאק:** Next.js App Router + Tailwind v4 + framer-motion. לא להוסיף ספריית עיצוב נוספת (shadcn, Radix, Material) רק כי הסקיל ממליץ.

## עדכון

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

או העתקה ידנית של `skills/taste-skill/SKILL.md` מהריפו המקורי לקובץ `SKILL.md` שבתיקייה זו.
