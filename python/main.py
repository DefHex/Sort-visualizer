import time
import customtkinter as ctk

from bubble_sort import bubble_sort
from insertion_sort import insertion_sort
from merge_sort import merge_sort
from quick_sort import quick_sort


class App(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.geometry("800x550")
        self.title("Sorting Visualizer")

        ctk.set_appearance_mode("dark")
        ctk.set_default_color_theme("dark-blue")

        header = ctk.CTkLabel(
            master=self,
            text="Sorting Visualizer",
            font=ctk.CTkFont(size=26, weight="bold"),
            text_color="#F5F5F5",
        )
        header.pack(pady=(20, 5))

        subtitle = ctk.CTkLabel(
            master=self,
            text="Compare different sorting algorithms in action.",
            font=ctk.CTkFont(size=14),
            text_color="#AAAAAA",
        )
        subtitle.pack(pady=(0, 15))

        self.main_frame = ctk.CTkFrame(
            master=self, corner_radius=20, fg_color="#1E1E1E"
        )
        self.main_frame.pack(padx=40, pady=20, fill="both", expand=True)

        algo_label = ctk.CTkLabel(
            master=self.main_frame,
            text="Select Sorting Algorithm:",
            font=ctk.CTkFont(size=16, weight="bold"),
            text_color="#D0D0D0",
        )
        algo_label.pack(pady=(25, 10))

        self.drop_down = ctk.CTkOptionMenu(
            master=self.main_frame,
            values=["Bubble Sort", "Insertion Sort", "Merge Sort", "Quick Sort"],
            width=260,
            height=35,
            fg_color="#2F2F2F",
            button_color="#3B3B3B",
            button_hover_color="#5C5C5C",
            text_color="#E8E8E8",
            font=ctk.CTkFont(size=14),
            command=self.dd_callback,
        )
        self.drop_down.pack(pady=(0, 25))

        self.entry = ctk.CTkEntry(
            master=self.main_frame,
            placeholder_text="Enter numbers separated by commas",
            width=550,
            height=40,
            corner_radius=10,
            border_width=0,
            fg_color="#292929",
            text_color="#EAEAEA",
            placeholder_text_color="#8A8A8A",
        )
        self.entry.pack(pady=(0, 25))

        self.button = ctk.CTkButton(
            master=self.main_frame,
            text="Sort Array",
            width=220,
            height=45,
            corner_radius=12,
            fg_color="#0078D4",
            hover_color="#0096FF",
            font=ctk.CTkFont(size=16, weight="bold"),
            command=lambda: self.btn_callback(None, None, None),
        )
        self.button.pack(pady=(0, 25))

        divider = ctk.CTkFrame(master=self.main_frame, height=2, fg_color="#3F3F3F")
        divider.pack(fill="x", padx=50, pady=10)

        self.label = ctk.CTkLabel(
            master=self.main_frame,
            text="Result will appear here.",
            font=ctk.CTkFont(size=14),
            text_color="#A0A0A0",
            wraplength=650,
            justify="center",
        )
        self.label.pack(pady=(15, 25))

        self.sorting_algs = {
            "Bubble Sort": {
                "method": bubble_sort,
                "lim": [5, 30],
                "range": [0, 555],
                "color": "#9370DB",
            },
            "Insertion Sort": {
                "method": insertion_sort,
                "lim": [5, 50],
                "range": [0, 555],
                "color": "#1E90FF",
            },
            "Merge Sort": {
                "method": merge_sort,
                "lim": [5, 500],
                "range": [0, 999],
                "color": "#FF8C00",
            },
            "Quick Sort": {
                "method": quick_sort,
                "lim": [5, 500],
                "range": [0, 999],
                "color": "#32CD32",
            },
        }

    def dd_callback(self, selected_value):
        self.label.configure(text="", text_color="#A0A0A0")
        if hasattr(self, "entry"):
            self.entry.pack_forget()
        if hasattr(self, "button"):
            self.button.pack_forget()

        choice = self.sorting_algs[selected_value]
        method, l, r, c = (
            choice["method"],
            choice["lim"],
            choice["range"],
            choice["color"],
        )
        self.entry = ctk.CTkEntry(
            master=self.main_frame,
            width=550,
            height=40,
            corner_radius=10,
            placeholder_text_color=c,
            placeholder_text=f"Enter ({l[0]}-{l[1]}) numbers between ({r[0]}-{r[1]}) separated by ,",
        )
        self.entry.pack(pady=10)
        self.button = ctk.CTkButton(
            master=self.main_frame,
            fg_color=c,
            hover_color="#666666",
            text="Sort",
            command=lambda: self.btn_callback(method, l, r),
        )
        self.button.pack(pady=10)

    def btn_callback(self, method, limit, num_range):
        entries = self.entry.get().strip()
        if not entries:
            self.entry.delete(0, "end")
            self.label.configure(text="Please enter some numbers!")
            return

        try:
            arr = [int(x) for x in entries.split(",")]
        except ValueError:
            self.entry.delete(0, "end")
            self.label.configure(text="Please separate the numbers using (,)")
            return

        if len(arr) < limit[0] or len(arr) > limit[1]:
            self.label.configure(
                text=f"Length of array does not match the required limits ({limit[0]}-{limit[1]})"
            )
            return

        if any(x < num_range[0] or x > num_range[1] for x in arr):
            self.entry.delete(0, "end")
            self.label.configure(
                text=f"Given numbers do not match the required range ({num_range[0]}-{num_range[1]})"
            )
            return

        start = time.time()
        method(arr)
        end = time.time()
        self.label.configure(
            text=(
                f"Sorted Array of length {len(arr)}: {arr}"
                f"using {method.__name__.replace('_', ' ')}. "
                f"Time required: {(end - start) * 1000:.2f} ms"
            )
        )


if __name__ == "__main__":
    app = App()
    app.mainloop()
