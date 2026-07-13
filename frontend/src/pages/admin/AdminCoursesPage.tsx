import { AddRounded, DeleteOutlineRounded, EditRounded } from "@mui/icons-material";
import { Alert, Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { Navigate } from "react-router";
import { createCourse, deleteCourse, getApiErrorMessage, getApiFieldErrors, getCourses, getCurrentUser, updateCourse } from "../../api/service";
import AppNav from "../../components/AppNav";
import type { Course, CourseRequest } from "../../types/course";

const emptyForm: CourseRequest = { title: "", description: "", imageUrl: "", price: 0 };

export default function AdminCoursesPage() {
  const user = getCurrentUser();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<Course | null>(null);
  const [form, setForm] = useState<CourseRequest>(emptyForm);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const courses = useQuery({ queryKey: ["courses"], queryFn: getCourses, enabled: user?.role === "ADMIN" });

  const save = useMutation({
    mutationFn: () => editing ? updateCourse(editing.id, form) : createCourse(form),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courses"] });
      setSuccess(editing ? "Course updated successfully." : "Course created successfully.");
      setOpen(false);
    },
  });
  const remove = useMutation({
    mutationFn: deleteCourse,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courses"] });
      setSuccess("Course deleted successfully.");
    },
  });

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "ADMIN") return <Navigate to="/courses" replace />;

  const showCreate = () => { setEditing(null); setForm(emptyForm); setOpen(true); };
  const showEdit = (course: Course) => {
    setEditing(course);
    setForm({ title: course.title, description: course.description ?? "", imageUrl: course.imageUrl ?? "", price: Number(course.price) });
    setOpen(true);
  };
  const submit = (event: FormEvent) => { event.preventDefault(); save.mutate(); };
  const fieldErrors = getApiFieldErrors(save.error);

  return <><AppNav /><Container maxWidth="lg" sx={{ py: 6 }}>
    <Stack direction={{ xs: "column", sm: "row" }} sx={{ justifyContent: "space-between", alignItems: { sm: "center" }, gap: 2, mb: 4 }}>
      <Box><Typography component="h1" variant="h3" sx={{ fontWeight: 900 }}>Course dashboard</Typography><Typography color="text.secondary">Create and manage the course catalog.</Typography></Box>
      <Button variant="contained" startIcon={<AddRounded />} onClick={showCreate}>Add course</Button>
    </Stack>
    {(courses.isError || remove.isError) && <Alert severity="error" sx={{ mb: 3 }}>{getApiErrorMessage(courses.error ?? remove.error)}</Alert>}
    {courses.isPending && <Box sx={{ textAlign: "center", py: 8 }}><CircularProgress /></Box>}
    <Paper variant="outlined" sx={{ overflow: "hidden" }}>
      {courses.data?.map((course, index) => <Stack key={course.id} direction="row" sx={{ alignItems: "center", gap: 2, px: 3, py: 2.5, borderBottom: index < courses.data.length - 1 ? "1px solid" : "none", borderColor: "divider" }}>
        <Box sx={{ width: 58, height: 58, borderRadius: 2, bgcolor: "#e0e7ff", backgroundImage: course.imageUrl ? `url(${course.imageUrl})` : "none", backgroundSize: "cover", backgroundPosition: "center", flexShrink: 0 }} />
        <Box sx={{ flexGrow: 1, minWidth: 0 }}><Typography sx={{ fontWeight: 800 }}>{course.title}</Typography><Typography variant="body2" color="text.secondary" noWrap>{course.description || "No description"}</Typography></Box>
        <Typography color="primary" sx={{ fontWeight: 850 }}>${Number(course.price).toFixed(2)}</Typography>
        <IconButton aria-label={`Edit ${course.title}`} onClick={() => showEdit(course)}><EditRounded /></IconButton>
        <IconButton aria-label={`Delete ${course.title}`} color="error" disabled={remove.isPending} onClick={() => { if (window.confirm(`Delete “${course.title}”?`)) remove.mutate(course.id); }}><DeleteOutlineRounded /></IconButton>
      </Stack>)}
      {courses.data?.length === 0 && <Typography color="text.secondary" sx={{ p: 5, textAlign: "center" }}>No courses yet. Add the first one.</Typography>}
    </Paper>
  </Container>
  <Dialog open={open} onClose={() => !save.isPending && setOpen(false)} fullWidth maxWidth="sm" component="form" onSubmit={submit}>
    <DialogTitle>{editing ? "Edit course" : "Add course"}</DialogTitle>
    <DialogContent><Stack spacing={2.5} sx={{ pt: 1 }}>
      {save.isError && <Alert severity="error">{getApiErrorMessage(save.error)}</Alert>}
      <TextField label="Title" value={form.title} required autoFocus error={Boolean(fieldErrors.title)} helperText={fieldErrors.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <TextField label="Description" value={form.description} multiline minRows={4} onChange={e => setForm({ ...form, description: e.target.value })} />
      <TextField label="Image URL" value={form.imageUrl} type="url" onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
      <TextField label="Price" value={form.price} type="number" required error={Boolean(fieldErrors.price)} helperText={fieldErrors.price} slotProps={{ htmlInput: { min: 0, step: "0.01" } }} onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
    </Stack></DialogContent>
    <DialogActions sx={{ px: 3, pb: 3 }}><Button onClick={() => setOpen(false)} disabled={save.isPending}>Cancel</Button><Button type="submit" variant="contained" disabled={save.isPending || !form.title.trim()}>{save.isPending ? <CircularProgress size={22} /> : "Save course"}</Button></DialogActions>
  </Dialog>
  <Snackbar open={Boolean(success)} autoHideDuration={3500} onClose={() => setSuccess("")} message={success} />
  </>;
}
