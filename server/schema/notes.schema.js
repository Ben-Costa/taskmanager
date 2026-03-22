const {z} = require('zod');

// Base fields for a note
const NoteBase = z.object({
  title: z.string().min(1).max(255),
  content: z.string().optional().nullable(),
});

// For POST /notes
const NoteCreateInput = NoteBase;

// For PUT /notes/:id (all fields optional)
const NoteUpdateInput = NoteBase.partial();

// For GET /notes (list endpoint)
const NoteQueryParams = z.object({
  search: z.string().optional(),
  minDate: z.string().optional(),
  maxDate: z.string().optional(),

  sortBy: z.enum(['created_date', 'modified_date', 'title'])
           .default('created_date'),

  sortOrder: z.enum(['asc', 'desc'])
             .default('desc'),

  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

module.exports = {
  NoteCreateInput,
  NoteUpdateInput,
  NoteQueryParams,
};